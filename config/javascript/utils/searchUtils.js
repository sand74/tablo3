import * as d3 from "d3";

export function showFindStantion(
  FindStantion,
  iconUID = "point-fill",
  iconClass = "pointer"
) {
  //console.log("code:", FindStantion);
  const href = `./svg/sprite/point-sprite.svg#${iconUID}`;

  if (FindStantion !== "") {
    const allStn = d3.selectAll("#stations");
    allStn.selectAll(`use[href="${href}"]`).remove();

    if (FindStantion !== "0") {
      const stnNode = allStn.selectAll(`#st_${FindStantion}`);
      const anchorNode = stnNode.select("#st");
      const iconNode = anchorNode.append("use");

      //console.log(iconNode.node());

      iconNode
        .attr("class", iconClass)
        .attr("href", href)
        .attr("width", "40px")
        .attr("height", "50px")
        .attr("x", "-10px")
        .attr("y", "-50px");
    }
  }
}
