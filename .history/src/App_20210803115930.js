import React, { useState } from 'react';

import './App.scss';

const defaultValues = {
	fullName: '',
	companyName: '',
	phone: '',
	workEmail: '',
	checkbox: false,
};

const App = () => {
	const [formValues, setFromValues] = useState(defaultValues);
	const [emailError, setEmailError] = useState('');
	const [isCheckboxErr, setIsCheckboxErr] = useState(false);

	/**
	 * @description Handle user form changes values
	 */
	const onChangeFormValues = (e) => {
		const { name, value } = e.target;
		setFromValues({ ...formValues, [name]: value });
	};

	const validation = () => {
		const { email, checkbox } = defaultValues;
		if (!validateEmail(email)) {
			setEmailError('Invalid, please try again');
		}
		if (!checkbox) {
			setIsCheckboxErr(true);
		}
	};

	const validateEmail = (email) => {
		const re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	const onClickSubmit = () => {
		console.log({ formValues });
	};
	console.log({ formValues });
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
						<form className="form-wrapper column" onSubmit={() => console.log('submit')}>
							<div className="form-title">Want to get the full version?</div>
							<div className="form-sub-title">Fill in the form below:</div>
							<div className="input-wrapper">
								<input
									type="text"
									placeholder="Full name"
									className="form-input"
									required
									name="fullName"
									onChange={onChangeFormValues}
								/>
							</div>
							<div className="input-wrapper">
								<input
									type="text"
									placeholder="Company name"
									className="form-input"
									required
									name="companyName"
									onChange={onChangeFormValues}
								/>
							</div>
							<div className="input-wrapper">
								<input
									type="number"
									placeholder="Phone"
									className="form-input"
									required
									name="phone"
									onChange={onChangeFormValues}
								/>
							</div>
							<div className="input-wrapper">
								<input
									type="text"
									placeholder="Work email"
									className="form-input"
									required
									name="workEmail"
									onChange={onChangeFormValues}
								/>
								<div className={`error ${emailError ? 'error-active' : ''}`}>{emailError}</div>
							</div>

							<button type="submit" className="form-btn">
								Download now {'>>'}
							</button>

							<div className="checkbox-input-wrapper row">
								<input type="checkbox" className="checkbox-input" />
								<div className="check-box-text">
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
