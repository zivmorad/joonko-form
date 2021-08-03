import React from 'react';

import './App.scss';

const App = () => {
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
								<input type="text" placeholder="Full name" className="form-input" />
								<div className="error">err</div>
							</div>
							<div className="input-wrapper">
								<input type="text" placeholder="Company name" className="form-input" />
								<div className="error">err</div>
							</div>
							<div className="input-wrapper">
								<input type="number" placeholder="Phone" className="form-input" />
								<div className="error">err</div>
							</div>
							<div className="input-wrapper">
								<input type="text" placeholder="Work email" className="form-input" />
								<div className="error">err</div>
							</div>

							<button type="submit" className="form-btn">
								Download now &gt&gt
							</button>

							<div className="checkbox-input-wrapper">
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
