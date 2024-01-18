function Contact() {
	return {
		fields: {
			firstname: "",
			lastname: "",
			company: "",
			email: "",
			city: "",
			zipcode: "",
			phone: "",
			message: "",
			rgpd: false,
		},
		errorMessage: "",
		errors: {
			firstname: false,
			lastname: false,
			company: false,
			email: false,
			city: false,
			zipcode: false,
			phone: false,
			message: false,
			rgpd: false,
		},
		// States
		emailSent: false,
		emailIsSending: false,
		emailStatusMessage: "",
		// API
		apiUrl: "/wp-json/bemy/v1/contact",

		logInputs() {
			console.log(
				this.fields.firstname,
				this.fields.lastname,
				this.fields.company,
				this.fields.email,
				this.fields.city,
				this.fields.zipcode,
				this.fields.phone,
				this.fields.message,
				this.fields.rgpd
			)
		},

		submitForm() {
			this.emailSent = false
			this.resetErrors()
			this.checkForm()
		},

		checkForm() {
			if (this.fields.firstname === "") {
				this.errors.firstname = true
			}
			if (this.fields.lastname === "") {
				this.errors.lastname = true
			}
			if (this.fields.company === "") {
				this.errors.company = true
			}
			if (this.fields.email === "") {
				this.errors.email = true
			} else {
				this.checkEmail()
			}
			if (this.fields.city === "") {
				this.errors.city = true
			}
			if (this.fields.zipcode === "") {
				this.errors.zipcode = true
			}
			if (this.fields.phone === "") {
				this.errors.phone = true
			} else {
				this.checkPhone()
			}
			if (this.fields.message === "") {
				this.errors.message = true
			} else {
				this.checkTextarea()
			}
			if (this.fields.rgpd === false) {
				this.errors.rgpd = true
			}
			if (
				this.errors.firstname === false &&
				this.errors.lastname === false &&
				this.errors.company === false &&
				this.errors.email === false &&
				this.errors.city === false &&
				this.errors.zipcode === false &&
				this.errors.phone === false &&
				this.errors.message === false &&
				this.errors.rgpd === false
			) {
				this.errorMessage = ""
				this.sendEmail()
			} else {
				this.errorMessage = "Veuillez compléter tous les champs pour envoyer le formulaire."
			}
		},

		checkEmail() {
			const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
			if (regex.test(this.fields.email)) {
				this.errors.email = false
			} else {
				this.errors.email = true
			}
		},

		checkPhone() {
			const regex = /^[0-9]{10}$/
			if (regex.test(this.fields.phone)) {
				this.errors.phone = false
			} else {
				this.errors.phone = true
			}
		},

		checkTextarea() {
			// Check if texarea doesn't contain html tags
			const regex = /<("[^"]*"|'[^']*'|[^'">])*>/
			if (regex.test(this.fields.message)) {
				this.errors.message = true
			} else {
				this.errors.message = false
			}
		},

		resetErrors() {
			this.errorMessage = ""
			this.errors.firstname = false
			this.errors.lastname = false
			this.errors.company = false
			this.errors.email = false
			this.errors.city = false
			this.errors.zipcode = false
			this.errors.phone = false
			this.errors.message = false
			this.errors.rgpd = false
		},

		sendEmail() {
			grecaptcha.ready(function () {
				grecaptcha.execute("6LcDsFEpAAAAALYFPI2wOtGraR1_VdGg199hCQIH", { action: "submit" }).then((token) => {
					console.log(token)
					this.emailIsSending = true

					const data = {
						firstname: this.fields.firstname,
						lastname: this.fields.lastname,
						company: this.fields.company,
						email: this.fields.email,
						city: this.fields.city,
						zipcode: this.fields.zipcode,
						phone: this.fields.phone,
						message: this.fields.message,
					}

					axios
						.post(this.apiUrl, data)
						.then((response) => {
							console.log(response)
							if (response.data.success) {
								this.emailIsSending = false
								this.emailSent = true
								this.emailStatusMessage = response.data.message
								this.resetFields()
							} else {
								this.emailIsSending = false
								this.emailSent = false
								this.emailStatusMessage =
									"Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer plus tard."
								this.resetFields()
							}
						})
						.catch((error) => {
							console.log(error)
						})
				})
			})
		},

		resetFields() {
			this.fields.firstname = ""
			this.fields.lastname = ""
			this.fields.company = ""
			this.fields.email = ""
			this.fields.city = ""
			this.fields.zipcode = ""
			this.fields.phone = ""
			this.fields.message = ""
			this.fields.rgpd = false
		},
	}
}

export { Contact }
