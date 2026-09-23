package main

import (
	"fmt"
	"context"
	"net/url"
	"encoding/base64"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/ses"
	"github.com/aws/aws-sdk-go-v2/service/ses/types"
)

var FormWithError = `<form
	class="contact-form"
	hx-post="/api/contact"
	hx-target="this"
	hx-encoding="json"
	hx-swap="outerHTML"
>
	<div class="message-error">
		<img src="./public/error-filled.svg"></img>
		Form data missing, or incorrectly filled
	</div>
	<label>Name:</label>
	<input type="text" name="name" placeholder="Your Name" required />
	<label>Email:</label>
	<input type="email" name="email" placeholder="Your Email" required />
	<label>Message:</label>
	<textarea name="message" placeholder="Your Message" required></textarea>
	<div class="form-footer">
		<div
			id="loading"
			hx-indicator 
			class="loading-indicator"
			role="status"
			aria-live="polite"
		>
			<img src="./public/circle-stroke.svg"></img>
			Sending...
		</div>
		<button type="submit">Send</button>
	</div>
</form>`

var SuccessNotification = `<div class="message-success">
	<img src="./public/checkmark-filled.svg"></img>
	message sent successfully!
</div>`

var ErrorNotification = `<div class="message-error">
	<img src="./public/error-filled.svg"></img>
	Something went wrong, please try again later
</div>`

var ServerError = events.APIGatewayProxyResponse{
	StatusCode: 500,
	Body: ErrorNotification,
};

var ServerSuccess = events.APIGatewayProxyResponse{
	StatusCode: 200,
	Body: SuccessNotification,
};

func HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	if len(request.Body) == 0 {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body: FormWithError,
		}, nil;
	};

	decodedBytes, err := base64.StdEncoding.DecodeString(request.Body);
	if err != nil {
		fmt.Printf("Error decoding base64 string: %v\n", err)
		return ServerError, nil;
	}
	decodedBody := string(decodedBytes);

	values, err := url.ParseQuery(decodedBody);
	if err != nil {
		fmt.Printf("Error decoding base64 string: %v\n", err)
		return ServerError, nil;
	}
	name := values.Get("name");
	message := values.Get("message");
	email := values.Get("email");

	cfg, err := config.LoadDefaultConfig(ctx, config.WithRegion("eu-west-1"))
	if err != nil {
		fmt.Printf("unable to load AWS config: %v\n", err)
		return ServerError, nil;
	}

	client := ses.NewFromConfig(cfg)

	input := &ses.SendEmailInput{
		Destination: &types.Destination{
			ToAddresses: []string{"dylan@dybev.uk"},
		},
		Message: &types.Message{
			Subject: &types.Content{
				Data: aws.String(fmt.Sprintf("Message from %s", name)),
			},
			Body: &types.Body{
				Text: &types.Content{
					Data: aws.String(message),
				},
			},
		},
		ReplyToAddresses: []string{email},
		Source: aws.String("no-reply@dybev.uk"),
	}

	resp, err := client.SendEmail(ctx, input)
	if err == nil {
		fmt.Printf("Email sent! Message ID: %s\n", *resp.MessageId)
		return ServerSuccess, nil;
	}

	fmt.Printf("failed to send email: %v\n", err)
	return ServerError, nil;
}
