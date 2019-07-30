import React, { Component } from 'react'
import { MDBCol, MDBRow } from 'mdbreact';
import RideComponent from './section/RideComponent';
import { toast } from 'react-toastify';

import RestApi from '../../util/RestApi';
import SessionManager from '../../util/SessionManager';

class RideListPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			rides: [],
			pending : true,
			active : true,
			done : true
		};
	}

	componentDidMount() {
		this.refreshList();
	}

	onChange(ev) {
		const target = ev.target;
		const key = target.id;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		this.setState({
			[key]: value
		});
	}

	refreshList() {
		RestApi.get("/me/rides", false)
			.then((result) => {
				this.setState({
					isLoaded: true,
					rides: result.rides || []
				});
			},
				(error) => {
					this.setState({
						isLoaded: true,
						rides: []
					});
				}
			);
	}

	requestRide() {
		RestApi.post(`/ride`)
			.then(data => {
				toast("Ride is requested");
				this.refreshList();
			}).catch(error => {
				debugger;
				toast(error.status || "Something went wrong");
				console.log(error);
			});
	}

	render() {
		let ridesHTML = this.state.rides.map((ride, index) => {
			if(this.state[ride.status] === false) return undefined;
			return <RideComponent key={ride.id+ride.updated_at} ride={ride} />
		});
		if(ridesHTML.length===0) {
			ridesHTML = 'No Rides';
		}
		let user = SessionManager.getUser() || {};
		return (
			<React.Fragment>
				<MDBRow className="justify-content-center">
					<MDBCol md="6" lg="12" className="mt-5">
						Welcome {user.name}
					</MDBCol>
					<MDBCol md="6" lg="12" className="mb-5 mt-1">
					{
					user.type==="driver" ?
					<strong>
					You may accept any pending rides
					<input type="button" value="Refresh List" className="rounded border p-2 ml-2" onClick={this.refreshList.bind(this)} />
					</strong>
					:
					<strong>
					You may request a ride
						<input type="button" value="Request Ride" className="rounded border p-2 ml-2 mr-2" onClick={this.requestRide.bind(this)} />
						 OR refresh to check updated status
						<input type="button" value="Refresh List" className="rounded border p-2 ml-2" onClick={this.refreshList.bind(this)} />
					</strong>
					}
					</MDBCol>
					<MDBCol>
						<label htmlFor="active" className="ml-0">Active</label>
						<input onChange={(ev) => this.onChange(ev)} type="checkbox" checked={this.state.active} id="active" className="p-3 m-3 mr-5" />
						<label htmlFor="pending" className="ml-0">Pending</label>
						<input onChange={(ev) => this.onChange(ev)} type="checkbox" checked={this.state.pending} id="pending" className="p-3 m-3 mr-5" />
						<label htmlFor="done" className="ml-0">Done</label>
						<input onChange={(ev) => this.onChange(ev)} type="checkbox" checked={this.state.done} id="done" className="p-3 m-3 mr-5" />
					</MDBCol>
					<MDBCol md="6" lg="12">
						<section className="text-center pb-3">
							<MDBRow className="d-flex justify-content-center">
								{ridesHTML}
							</MDBRow>
						</section>
					</MDBCol>
				</MDBRow>
			</React.Fragment>
		);
	}

}

export default RideListPage;