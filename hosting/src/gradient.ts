let gradientDeg = 90;
let start_transparent = 0;
let end_transparent = 100;
let color = 50;
let gradient_direction = 0.5;

export function randomGradient() {
	let welcomeText = document.querySelector('section.welcome p.bigText');
	if (welcomeText) {
		if (color < 10) {
			gradient_direction = 0.5;
		}
		if (color > 90) {
			gradient_direction = -0.5;
		}
		color += gradient_direction;
		gradientDeg += Math.random();
		welcomeText.style.backgroundImage = `linear-gradient(${gradientDeg}deg, var(--text-primary) ${start_transparent}%, var(--background-brand) ${color}%, var(--text-primary) ${end_transparent}%`;
	}
}
