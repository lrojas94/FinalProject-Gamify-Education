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
class TopicGraphData extends Component {
    constructor(props) {
        super(props);
        this.generateRightWrongGraph();
        this.generateDifficultyDistributionChart();
    };

    generateRightWrongGraph() {
        this.correctAnswersChart = {
            labels: [
                this.props.intl.messages['charts.rightAnswers'],
                this.props.intl.messages['charts.wrongAnswers'],
            ],
            datasets: [
                {
                    data: [this.props.totalAnswers - this.props.correctAnswers, this.props.correctAnswers],
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

    generateDifficultyDistributionChart() {
        var difficulties = this.props.difficulties;
        if(difficulties) {

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

            _.forEach(difficulties, (s, index) => {
                this.answerDistributionChart.labels.push(s.name);
                this.answerDistributionChart.datasets[0].data.push(s.totalAnswers);
            });

        }
    }

    render() {
        if(!this.props.totalAnswers) {
            return (
                <div className='row'>
                    <div className='col-xs-12'>
                        <h4 className='text-center'> <FormattedMessage id='chart.noDataToShow'/> </h4>
                    </div>
                </div>
            )
        }
        return (
            <div className='row'>
                <div className='col-xs-12 col-md-6'>
                    <h4 className='text-center'> <FormattedMessage id='topics.chart.rightwrong'/> </h4>
                    <Doughnut data={this.correctAnswersChart}/>
                </div>
                <div className='col-xs-12 col-md-6'>
                    <h4 className='text-center'> <FormattedMessage id='topics.chart.difficultydistribution'/> </h4>
                    <Doughnut data={this.answerDistributionChart}/>
                </div>
            </div>
        );
    }
};
export default injectIntl(TopicGraphData);
