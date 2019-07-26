import React, { Component } from 'react'
import { MDBCol, MDBRow } from 'mdbreact';
import RideComponent from './section/RideComponent';

import RestApi from '../../util/RestApi';
import SessionManager from '../../util/SessionManager';

class RideListPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			rides: []
		};
	}

	componentDidMount() {
		this.refreshList();
	}

	refreshList() {
		RestApi.get("/me/rides", false)
			.then((result) => {
				console.log(result);
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
				console.log(data);
				this.refreshList();
			}).catch(error => {

			});
	}

	render() {
		let ridesHTML = this.state.rides.map((ride, index) => {
			return <RideComponent key={ride.id} ride={ride} />
		});
		if(ridesHTML.length===0) {
			ridesHTML = 'No Rides';
		}
		let user = SessionManager.getUser();
		return (
			<React.Fragment>
				<MDBRow className="justify-content-center">
					<MDBCol md="6" lg="12" className="mt-5">
						Welcome {user.name}
					</MDBCol>
					<MDBCol md="6" lg="12" className="mb-5 mt-1">
					{
					user.type==="driver" ?
					<strong>You can accept any pending rides</strong> :
						<input type="button" value="Request a ride" className="rounded border p-2" onClick={this.requestRide.bind(this)} />
					}
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