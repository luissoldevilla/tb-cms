import React from "react";
import format from "date-fns/format";

import Jumbotron from "./components/jumbotron";

export default class PostPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;
    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

    return <div>
      <Jumbotron image={image} title={entry.getIn(["data", "title"])} />

      <div className="bg-off-white pv4">
        <div className="ph3 mw7 center">
          <h2 className="f2 b lh-title mb2">{entry.getIn(["data", "intro", "heading"])}</h2>
          <p className="mb4 mw6">{entry.getIn(["data", "intro", "text"])}</p>

          <div className="flex-ns mhn2-ns mb3 gridm">
            {(entry.getIn(["data", "products"]) || []).map((product, i) => <div className="ph2-ns w-50-ns" key={i}>
              <img src={getAsset(product.get("image"))} alt="" className="center db mb3" style={{width: "240px"}}/>
              <p>{product.get("text")}</p>
              <p><span class="f4">$</span>{product.get("price")}</p>
            </div>)}
          </div>
        </div>
      </div>

      <img src={getAsset(entry.getIn(['data', 'full_image']))} alt="" className="db w-100"/>

    </div>;
  }
}
