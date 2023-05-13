// Write your code here
import {Component} from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

class VaccinationCoverage extends Component {
  state = {last7DaysVaccination: []}

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
      this.setState({last7DaysVaccination: updatedDataLast7Days})
    }
  }

  DataFormatter = number => {
    if (number > 1500) {
      return `${(number / 1500).toString()}k`
    }
    return number.toString()
  }

  render() {
    const {last7DaysVaccination} = this.state
    console.log(last7DaysVaccination)
    return (
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={last7DaysVaccination}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={this.DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="dose1" name="Dose 1" fill="#1f77b4" barSize="20%" />
          <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

export default VaccinationCoverage
