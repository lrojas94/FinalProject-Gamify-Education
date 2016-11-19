import * as axios from 'axios';
import React, {Component} from 'react';
import Griddle from 'griddle-react';
import FileBase64 from './../general/base64';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Route} from './../../models/route';
import MathTextField from './../general/mathTextField';
import difficultyActions from './../../actions/difficulties';
import topicActions from './../../actions/topics';
import AutoFillSelectBox from './../general/autoFillSelectBox';
import {FormattedMessage, injectIntl} from 'react-intl';

function mapStateToProps(props) {
    return {
        difficultys: {
            options: props.difficultys.options
        },
        topics: {
            options: props.topics.options
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDifficultyOptions: (search) => dispatch(difficultyActions.fetchOptions(search)),
        fetchTopicOptions: (search) => dispatch(topicActions.fetchOptions(search))
    };
}

class AchievementForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
    };

    componentWillMount() {
        this.props.fetchDifficultyOptions();
        this.props.fetchTopicOptions();
    }

    getFiles(files) {
        console.log(files);
    }

    render() {
        return (
            <div className='row'>
                <div className='col-xs-12'>
                    <label htmlFor="input-topic-name" className="control-label">Test</label>
                    <FileBase64 multiple={false} onDone={this.getFiles.bind(this)}
                                elementProps={{className: 'btn btn-block m-light-blue'}}
                                handleFormChange={this.props.handleFormChange}/>
                </div>
                <div className='col-xs-12'>
                    <div className="form-group">
                        {this.props.id
                            ? (<input type='hidden' name='id' value={this.props.id}/>)
                            : ''}
                        <label htmlFor="input-topic-name" className="control-label">
                            <FormattedMessage id="form.achievementName"/> *
                        </label>
                        <input type="text" className="form-control" id="input-topic-name" onChange={this.props.handleFormChange} value={this.props.name} name='name' required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-topic-iconUrl" className="control-label">Icon Image URL *</label>
                        <input type="text" className="form-control" id="input-topic-iconUrl" onChange={this.props.handleFormChange} value={this.props.iconUrl} name='iconUrl' required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="input-topic-description" className="control-label">
                            <FormattedMessage id="form.description" /> *
                        </label>
                        <textarea type="text" className="form-control" id="input-topic-description" onChange={this.props.handleFormChange} value={this.props.description} name='description' required/>
                    </div>
                </div>
                <div className='col-xs-6'>
                    <div className='form-group'>
                        <label htmlFor="input-topic-thresholdQuantity" className="control-label">
                            <FormattedMessage id="form.thresholdQuantity" />
                        </label>
                        <input type="text" className="form-control"
                            id="input-topic-thresholdQuantity"
                            onChange={this.props.handleFormChange}
                            value={this.props.thresholdQuantity}
                            name='thresholdQuantity'/>
                    </div>
                </div>
                <div className='col-xs-6'>
                    <div className='form-group'>
                        <label htmlFor="input-topic-thresholdPercent" className="control-label">
                            <FormattedMessage id="form.thresholdPercent" />
                        </label>
                        <input type="text" className="form-control"
                            id="input-topic-thresholdPercent"
                            onChange={this.props.handleFormChange}
                            value={this.props.thresholdPercent}
                            name='thresholdPercent'/>
                    </div>
                </div>
                <div className='col-xs-12 col-sm-6'>
                    <div className="form-group">
                        <AutoFillSelectBox searchTitle={this.props.intl.messages['form.achievementDifficulty']}
                            fetch={this.props.fetchDifficultyOptions}
                            handleFormChange={this.props.handleFormChange}
                            name={'difficultyId'}
                            selected={this.props.difficultyId}
                            items={this.props.difficultys.options.data}
                            required={true}/>
                    </div>
                </div>
                <div className='col-xs-12 col-sm-6'>
                    <div className="form-group">
                        <AutoFillSelectBox searchTitle={this.props.intl.messages['form.achievementTopic']}
                            fetch={this.props.fetchTopicOptions}
                            handleFormChange={this.props.handleFormChange}
                            name={'topicId'}
                            selected={this.props.topicId}
                            items={this.props.topics.options.data}
                            required={true}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AchievementForm));
