import * as axios from 'axios';
import React, {Component} from 'react';
import Griddle from 'griddle-react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Route} from './../../models/route';
import {FormattedMessage, injectIntl} from 'react-intl';
import * as Chart from 'chart.js';
import {Doughnut, Pie} from 'react-chartjs-2';
Chart.defaults.global.responsive = true;
/**
 * This method does not bother createing the form. Instead, it will return the fields so that they can be
 * added anywhere they seem to be needed.
 */
class ProblemGraphData extends Component {
    constructor(props) {
        super(props);
        this.generateRightWrongGraph();
        this.generateAnswerDistributionGraph();
    };

    generateRightWrongGraph() {
        var solutions = this.props.solutions;
        if(solutions) {
            console.log(solutions);
            var answers = _.reduce(solutions, (sum, s) => {
                return sum + parseInt(s.totalAnswers);
            }, 0);
            var correctAnswers = _.reduce(solutions, (sum, s) => {
                return !s.isCorrect ? sum : sum + parseInt(s.totalAnswers);
            }, 0);

            this.correctAnswersChart = {
                labels: [
                    "Wrong Answers",
                    "Right Answers",
                ],
                datasets: [
                    {
                        data: [answers - correctAnswers, correctAnswers],
                        backgroundColor: [
                            "#F44336",
                            "#8BC34A",
                        ],
                        hoverBackgroundColor: [
                            "#EF5350",
                            "#9CCC65",
                        ]
                    }]
            };

        }
    }

    generateAnswerDistributionGraph() {
        var solutions = this.props.solutions;
        if(solutions) {

            this.answerDistributionChart = {
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: [
                            "#FF6384",
                            "#059BFF",
                            "#FFCE56",
                            "#22CECE",
                            "#36A2EB"
                        ],
                    }]
            };

            _.forEach(solutions, (s, index) => {
                this.answerDistributionChart.labels.push(index);
                this.answerDistributionChart.datasets[0].data.push(s.totalAnswers);
            });

        }
    }

    render() {
        return (
            <div className='row'>
                <div className='col-xs-12 col-md-6'>
                    <h4 className='text-center'> <FormattedMessage id='problems.chart.rightwrong'/> </h4>
                    <Doughnut data={this.correctAnswersChart}/>
                </div>
                <div className='col-xs-12 col-md-6'>
                    <h4 className='text-center'> <FormattedMessage id='problems.chart.answerdistribution'/> </h4>
                    <Doughnut data={this.answerDistributionChart}/>
                </div>
            </div>
        );
    }
};
export default injectIntl(ProblemGraphData);
