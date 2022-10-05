import React from "react"
import { log, logwarn, logerror } from "../std"

class Button extends React.Component {


    render() {
        const { href, text, icon, children } = this.props;
        return (
            <a href={href} style={styles.Button} className="home__btn" {...this.props}>
                {icon ? (<span style={{ "width": "40px" }}><img src={icon} /></span>) : ""}
                <span>{text}</span>
                {children}
            </a>
        )
    }
}

const styles = {
    Button: {
        cursor: "pointer"
    }
}

export default Button;