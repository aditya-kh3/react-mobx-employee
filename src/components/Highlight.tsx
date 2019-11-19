import * as React from "react";

interface IHighlightProps {
  text: string;
  search: string;
}

class Highlight extends React.Component<IHighlightProps, {}> {
  regexHighlight(text, search) {
    const data = text.replace(
      new RegExp(search, "gi"),
      '<span class="highlightedText">$&</span>'
    );
    return { __html: data };
  }
  render() {
    const { text, search } = this.props;
    return <div dangerouslySetInnerHTML={this.regexHighlight(text, search)} />;
  }
}

export default Highlight;
