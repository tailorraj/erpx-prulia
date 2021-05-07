import React, { Component } from "react";
export default class DeviceCard extends Component {
  render() {
    return (
      <div class="DeviceContainer" >
        <img
          src={`http://167.99.77.197/${this.props.data.device_photo}`}
          className="DeviceImg"
        />
        <div class="Device-card-body custom-des-device"  >
          <p
            class="card-titlefont-weight-bold"
            dangerouslySetInnerHTML={{ __html: this.props.data.device_content }}
          ></p>
        </div>
      </div>
    );
  }
}
