import React from "react";

class Demo extends React.Component {
  static async getInitialProps(ctx) {
    const res = await fetch("https://api.github.com/repos/vercel/next.js");
    console.log("res", res);
    const json = await res.json();
    console.log("res", json);
    return { stars: json.stargazers_count };
  }

  render() {
    return <div>Next stars: {this.props.stars} test</div>;
  }
}

export default Demo;
