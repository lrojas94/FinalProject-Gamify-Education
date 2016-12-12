import * as axios from 'axios';
import React, {Component} from 'react';
import Griddle from 'griddle-react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Route} from './../../models/route';
import {FormattedMessage, injectIntl} from 'react-intl';
import * as randomMC from 'random-material-color';
import * as Chart from 'chart.js';
import {Doughnut, Pie, Bar} from 'react-chartjs-2';
Chart.defaults.global.responsive = true;
/**
 * This method does not bother createing the form. Instead, it will return the fields so that they can be
 * added anywhere they seem to be needed.
 */
class ProblemGraphData extends Component {
    constructor(props) {
        super(props);
        this.prepareTopicAndDifficultyChart();
    };

    prepareTopicAndDifficultyChart() {
        //=====================================
        //

        var topicGraphData= {
            labels: [this.props.intl.messages['home.correctAnswers'], this.props.intl.messages['home.totalAnswers']],
            datasets: [], // 1 datasets per topic.
        }

        var difficultyGraphData= {
            labels: [this.props.intl.messages['home.correctAnswers'], this.props.intl.messages['home.totalAnswers']],
            datasets: [], // 1 datasets per diff.
        }

        _.forEach((this.props.topics), (topic) => {
            // add those dataset
            let color = randomMC.getColor();
            let label = topic.name;
            topicGraphData.datasets.push({
                label,
                backgroundColor: [color, color],
                data: [topic.correctAnswers, topic.totalAnswers - topic.correctAnswers]
            });
        });

        _.forEach((this.props.difficulties), (difficulty) => {
            // add those dataset
            let color = randomMC.getColor();
            let label = difficulty.name;
            difficultyGraphData.datasets.push({
                label,
                backgroundColor: [color, color],
                data: [difficulty.correctAnswers, difficulty.totalAnswers - difficulty.correctAnswers]
            });
        });

        this.topicGraphData = topicGraphData;
        this.difficultyGraphData = difficultyGraphData;
    }

    renderSolutions() {
        return _.map(this.props.solutions, (sols, idx) => {
            return (
                <div className='col-xs-12 col-md-6'>
                    <h3 className='text-center'>#{idx}</h3>
                    <img key={sols.id} className='img img-responsive center-block' src={sols.url}/>
                </div>
            );
        });
    }

    render() {
        return (
            <div className='row'>
                {this.props.topics.length > 0 ? (<div className='col-xs-12'>
                    <h4 className='text-center'> <FormattedMessage id='students.chart.pertopic'/> </h4>
                    <Bar data={this.topicGraphData}
                        options={{ scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                                    // OR //
                                    beginAtZero: true   // minimum value will be 0.
                                }
                            }]
                        }}}/>
                </div> ): ''}
                {this.props.difficulties.length > 0 ? (<div className='col-xs-12'>
                    <h4 className='text-center'> <FormattedMessage id='students.chart.perdifficulty'/> </h4>
                    <Bar data={this.difficultyGraphData}
                        options={{ scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                                    // OR //
                                    beginAtZero: true   // minimum value will be 0.
                                }
                            }]
                        }}}/>
                </div> ): ""}
                { this.props.topics.length === 0 && this.props.difficulties.length === 0 ? (<div>
                    <h4 className='text-center'> <FormattedMessage id='chart.noDataToShow'/> </h4>
                    </div>) : ""}
            </div>
        );
    }
};
export default injectIntl(ProblemGraphData);
