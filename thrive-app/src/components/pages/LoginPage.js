import React, { Component } from 'react'
import { MDBCol, MDBRow, MDBIcon, MDBBtn, MDBCard, ToastContainer, toast } from 'mdbreact';

import RestApi from '../../util/RestApi';
import SessionManager from '../../util/SessionManager';
import { Redirect } from 'react-router-dom';
import './LoginPage.css';

class LoginPage extends Component {

	constructor(props) {
		super(props);
		let user = SessionManager.getUser();
		this.state = {
			isLoggedin : user?true:false,
			username : '',
			password : ''
		};
	}

	onChange(ev) {
		const target = ev.target;
		const key = target.id;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		this.setState({
			[key]: value
		});
	}

	submit(ev) {
		ev.preventDefault();
		let apiObj = {
			"username": this.state.username,
			"password": this.state.password
		};
		RestApi.post("/login", apiObj)
		.then(data => {
			this.setState({
				isLoggedin : SessionManager.save(data)
			});
			console.log(data);
		}).catch(error => {
			this.setState({
				isLoggedin : false
			});
		});
	}

	render() {
		if(this.state.isLoggedin) {
			return <Redirect to='/'/>;
		}
		return (
			<React.Fragment>
				<div className="h-100 fullscreen">
					<div className="d-flex justify-content-center h-100">
						<div className="user_card">
							<div className="d-flex justify-content-center">
								<div className="brand_logo_container">
									{/* <h4>Thrive Project</h4> */}
									{/* Consumer & Driver App */}
								</div>
							</div>
							<div className="d-flex justify-content-center form_container">
								<div>
								<form className="mt-4" onSubmit={this.submit.bind(this)}>
									<MDBCol>
									<input type="text" onChange={(ev) => this.onChange(ev)} placeholder="username" id="username" value={this.state.username} className="rounded border p-2 ml-2 col-md-10 mr-2" />
									</MDBCol>
									<MDBCol className="mt-2">
									<input type="password" onChange={(ev) => this.onChange(ev)} placeholder="password" id="password" value={this.state.password} className="rounded border p-2 ml-2 col-md-10 mr-2" />
									</MDBCol>
									<MDBCol className="mt-3">
									<input type="submit" value="LOGIN" className="rounded border p-2 ml-2 mr-2" />
									</MDBCol>
								</form>
								</div>
							</div>
							<div id="loader" className="loader"></div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

}

export default LoginPage;