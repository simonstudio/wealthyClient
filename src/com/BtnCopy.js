import React, { Component } from "react";

class BtnCopy extends React.Component {
    state = {
        icon: "🤘"
    }
    copy = (value) => {
        // console.log(this.state.icon)
        navigator.clipboard.writeText(value);
        this.setState({ icon: "✔️" })
        setTimeout(() => {
            this.setState({ icon: "🤘" })
        }, 1500);
    }

    render() {
        return (
            <label alt="copy" style={styles.btnCopy} onClick={(e) => this.copy(this.props.value)}>
                {this.state.icon}
            </label >
        )
    }
}

const styles = {
    btnCopy: {
        cursor: "pointer"
    },
    btnChecked: {
        cursor: "pointer", color: "green"
    },
}
export default BtnCopy;