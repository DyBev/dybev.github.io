package main

import (
	"dybev.uk/portfolio/functions/contact/handler"
	"github.com/aws/aws-lambda-go/lambda"
)

func main() {
	lambda.Start(handler.HandleRequest)
}
