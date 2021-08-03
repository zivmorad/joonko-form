import React, { useState } from 'react';
import axios from 'axios';

import './App.scss';

const defaultValues = {
	fullName: '',
	companyName: '',
	phone: '',
	email: '',
	checkbox: false,
};

const App = () => {
	const [formValues, setFromValues] = useState(defaultValues);
	const [errors, setErrors] = useState({});

	/**
	 * @description Handle user form changes values
	 */
	const onChangeFormValues = (e) => {
		const { name, value } = e.target;
		setFromValues({ ...formValues, [name]: value });
	};
	/**
	 * @description Handle checkbox on change
	 */
	const onClickCheckbox = () => {
		const newFormValues = { ...formValues };
		newFormValues.checkbox = !newFormValues.checkbox;
		setFromValues(newFormValues);
	};

	/**
	 * @description Handle form validation
	 * @returns isValid boolean
	 */
	const validation = () => {
		const newErrors = {};
		let isValid = true;
		const { email, checkbox, phone, fullName, companyName } = formValues;
		// Full name validation
		if (!fullName) {
			newErrors.fullName = 'Full name is required';
			isValid = false;
		}
		// Company name validation
		if (!companyName) {
			newErrors.companyName = 'Company Name is required';
			isValid = false;
		}
		// Phone validation
		if (!phone) {
			newErrors.phone = 'Phone is required';
			isValid = false;
		} else if (!validatePhoneNumber(phone)) {
			newErrors.phone = 'Invalid, please try again';
			isValid = false;
		}
		// Email validation
		if (!email) {
			newErrors.email = 'Email is required';
		} else if (!validateEmail(email)) {
			newErrors.email = 'Email badly formatted';
			isValid = false;
		}
		// Checkbox validation
		if (!checkbox) {
			newErrors.checkbox = true;
			isValid = false;
		}
		setErrors(newErrors);
		return isValid;
	};

	// Email validation
	const validateEmail = (email) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	// Phone validation
	const validatePhoneNumber = (phone) => {
		const re = /^[0][5][0|2|3|4|5|8|9]{1}[-]{0,1}[0-9]{7}$/;
		return re.test(String(phone).toLowerCase());
	};

	/**
	 *@description Handle submit function
	 */
	const onClickSubmit = async (e) => {
		e.preventDefault();
		const isValid = validation();
		if (isValid) {
			const res = await sendFormData(formValues);
			if (res && res.id) {
				await getPdfLink(res.id);
			}
		}
	};

	/**
	 * @description Send the form values to the server by axios post request
	 */
	const sendFormData = async () => {
		try {
			const { fullName, companyName, email, phone } = formValues;
			const url = 'https://u5d6gnw6aj.execute-api.us-east-1.amazonaws.com/api/data';
			const config = {
				headers: {
					'x-api-key': 'VXUsgQ2jsq3EM30icjHA91tETkqFwtXDak07xebM',
					'Content-Type': 'application/json',
				},
			};
			const res = await axios.post(
				url,
				{
					name: fullName,
					company_name: companyName,
					email,
					phone,
				},
				config
			);
			if (res && res.status === 200) {
				return res.data;
			} else if (res && res.status === 400) {
				throw new Error('one of the fieldss is empty or missing');
			} else if (res && res.status === 500) {
				throw new Error('one of the fields is empty or missing');
			}
		} catch (err) {
			console.log(`App/sendFormData Err: ${err.message}`);
			return null;
		}
	};

	/**
	 * @description Send get req to the specific link
	 */
	const getPdfLink = async (id) => {
		try {
			const url = 'https://u5d6gnw6aj.execute-api.us-east-1.amazonaws.com/api/file';
			const config = {
				headers: {
					'x-api-key': 'VXUsgQ2jsq3EM30icjHA91tETkqFwtXDak07xebM',
					'Content-Type': 'application/json',
				},
				params: {
					id,
				},
			};
			const res = await axios.get(url, config);
			if (res && res.status === 200) {
				const pdfLink = res.data.link;
				window.open(pdfLink);
			}
		} catch (err) {
			console.log(`App/getPdfLink Err: ${err.message}`);
			window.open('https://joonko.co');
			return null;
		}
	};

	return (
		<div className="main-page-wrapper center-page">
			<div className="app-wrapper row">
				<div className="details-section column">
					<div className="details-text-wrapper">
						<div className="title bold">The Future of Work in the now: Why you should Become Remote-ready</div>
						<div className="sub-title">Infographic</div>
						<p className="details-text">
							The results are in, and the verdict? Remote is here to stay. Thanks to a global pandemic companies have
							had to reevaluate the power of distributed workforces and we’ve put together all the reasons why going
							remote is the right move to make. In this infographics, you’ll see:
							<br />
							<br />
							• How remote work broadens the talent pool
							<br />
							• The productivity results behind distributed teams
							<br />• An increase in diversity as a result of remote recruitment
							<br /> • Money saved on operational costs and salary negotiations
							<br />
							<br /> What better time to refresh your strategy than on the brink of a whole new world? Dig into this
							list of recruiting methodologies and adjust your sails for the future!
						</p>
					</div>
				</div>
				<div className="form-section column">
					<div className="form-card column">
						<form className="form-wrapper column" onSubmit={onClickSubmit}>
							<div className="form-title">Want to get the full version?</div>
							<div className="form-sub-title">Fill in the form below:</div>
							<div className="input-wrapper">
								<input
									type="text"
									placeholder="Full name"
									className="form-input"
									name="fullName"
									onChange={onChangeFormValues}
									value={formValues.fullName}
								/>
								<div className={`error ${errors.fullName ? 'error-active' : ''}`}>{errors.fullName}</div>
							</div>
							<div className="input-wrapper">
								<input
									type="text"
									placeholder="Company name"
									className="form-input"
									name="companyName"
									onChange={onChangeFormValues}
									value={formValues.companyName}
								/>
								<div className={`error ${errors.companyName ? 'error-active' : ''}`}>{errors.companyName}</div>
							</div>
							<div className="input-wrapper">
								<input
									type="number"
									placeholder="Phone"
									className="form-input"
									name="phone"
									onChange={onChangeFormValues}
									value={formValues.phone}
								/>
								<div className={`error ${errors.phone ? 'error-active' : ''}`}>{errors.phone}</div>
							</div>
							<div className="input-wrapper">
								<input
									type="text"
									placeholder="Work email"
									className="form-input"
									name="email"
									onChange={onChangeFormValues}
									value={formValues.email}
								/>
								<div className={`error ${errors.email ? 'error-active' : ''}`}>{errors.email}</div>
							</div>

							<button type="submit" className="form-btn">
								Download now {'>>'}
							</button>

							<div className="checkbox-input-wrapper row">
								<input
									type="checkbox"
									name="checkbox"
									className="checkbox-input"
									onChange={onClickCheckbox}
									value={formValues.checkbox}
									checked={formValues.checkbox}
								/>
								<div className={`check-box-text ${errors.checkbox ? 'checkboxErr' : ''}`}>
									I agree to the privacy policy including for Joonko to use my contact details to contact me for
									marketing purposes.
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
