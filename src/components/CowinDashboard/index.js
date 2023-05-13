// Write your code here
import {Component} from 'react'
import './index.css'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'

class CowinDashboard extends Component {
  state = {
    vaccinationByAge: [],
    vaccinationByGender: [],
  }

  componentDidMount() {
    this.getResponse()
  }

  getResponse = async () => {
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedDataLast7Days = data.last_7_days_vaccination.map(
        eachItem => ({
          vaccineDate: eachItem.vaccine_date,
          dose1: eachItem.dose_1,
          dose2: eachItem.dose_2,
        }),
      )
      const updatedDataVaccinationByAge = data.vaccination_by_age.map(
        eachItem => ({
          age: eachItem.age,
          count: eachItem.count,
        }),
      )
      const updatedDataVaccinationByGender = data.vaccination_by_gender.map(
        eachItem => ({
          count: eachItem.count,
          gender: eachItem.gender,
        }),
      )
      this.setState({
        last7DaysVaccination: updatedDataLast7Days,
        vaccinationByAge: updatedDataVaccinationByAge,
        vaccinationByGender: updatedDataVaccinationByGender,
      })
    }
  }

  render() {
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    return (
      <div className="bg-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="cowin-logo"
          />
          <h1 className="co-win-heading">Co-WIN</h1>
        </div>
        <h1 className="main-heading">CoWIN Vaccination in India</h1>
        <div className="vaccination-coverage-container">
          <h1 className="Vaccination-Coverage-heading">Vaccination Coverage</h1>
          <VaccinationCoverage />
        </div>
        <div className="vaccination-coverage-container">
          <h1 className="Vaccination-Coverage-heading">Vaccination Coverage</h1>
          <VaccinationByGender />
        </div>
      </div>
    )
  }
}

export default CowinDashboard
