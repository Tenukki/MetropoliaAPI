import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
   
  createLeafletElement() {
      console.log(this.props.nyky)
    const { map } = this.props;
    let leafletElement = L.Routing.control({
      waypoints: [L.latLng(this.props.info[0].y,this.props.info[1].x), L.latLng(this.props.info[1].y, this.props.info[1].x)]
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);