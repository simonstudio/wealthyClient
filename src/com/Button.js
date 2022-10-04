import React from "react"

class Button extends React.Component {

    render() {
        const { href, text } = this.props;
        return (
            <a href={href} className="home__btn"><span>{text}</span></a>
        )
    }
}

export default Button;