import React, { Component } from 'react'
import { MDBCard, MDBCol, MDBCardBody, MDBCardText, MDBCardFooter, MDBIcon } from 'mdbreact';
import { toast } from 'react-toastify';
import moment from 'moment';
import RestApi from '../../../util/RestApi';
import SessionManager from '../../../util/SessionManager';

let message = {
	'pending' 	: 'We are waiting for a confirmation',
	'active'  	: 'Ride is in progress',
	'done'		: 'Ride is completed'
};

class RideComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			ride: props.ride
		};
	}

	confirm() {
		let ride = this.state.ride;
		RestApi.post(`/ride/${ride.id}/confirm`)
		.then(ride => {
			toast("The ride was confirmed");
			this.setState({
				ride : ride
			});
		}).catch(error => {
			toast(error.status || "Something went wrong");
			console.log(error);
		});
	}

	render() {
		let user = SessionManager.getUser();
		return (
			<MDBCol lg="4" xl="4" className="mb-3">
				<MDBCard className="d-flex mb-2">
					<MDBCardBody>
						<MDBCardText className="font-bold mb-1">
							<strong>{this.state.ride.id} / {this.state.ride.status}</strong>
						</MDBCardText>
						<MDBCardText>
							Requested At : {moment(this.state.ride.created_at).format("YYYY-MM-DD hh:mm A")}
							<br />
							Last Updated : {moment(this.state.ride.updated_at).format("YYYY-MM-DD hh:mm A")}
							<strong>
								{/* <a rel="noopener noreferrer" target="_blank" href={this.state.ride.JENKINS_JOB_URL}> Jenkins Job </a> |
								<a rel="noopener noreferrer" target="_blank" href={this.state.ride.AUTOMATION_REPO}> Suite Repo </a> |
								<a rel="noopener noreferrer" target="_blank" href={this.state.ride.SERVICE_REPO}> Service Repo </a> */}
							</strong>
						</MDBCardText>
					</MDBCardBody>
					<MDBCardFooter className="links-light profile-card-footer">
						<span className="right">
							{
							this.state.ride.status==="pending" && user.type==="driver"?
							<form>
							<MDBCol>
							<input type="button" value="ACCEPT" className="rounded border p-2 ml-2 mr-2" onClick={this.confirm.bind(this)} />
							</MDBCol>
							</form>
							:
							message[this.state.ride.status]
							}
							{/* <NavLink to={"/ride/" + rideName} className="p-2">
								See Details
                      <MDBIcon icon="image" className="ml-1" />
							</NavLink> */}
						</span>
					</MDBCardFooter>
				</MDBCard>
			</MDBCol>
		)
	}

}

export default RideComponent;

