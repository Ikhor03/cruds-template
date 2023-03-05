const Input = (props) => {
  if(props.type === 'checkbox') {
    return (
      <div>
        { props.error && props.error.map(err => <p key={err} className="invalid">* {err}</p>)}
        <input className={props.error && 'is-invalid'} {...props} />
        <label>{props.label}</label>
      </div>
    )
  }else {
    return (
      <div>
        <label>{props.label}</label>
        <input className={`form-control ${props.error && 'is-invalid'}`} {...props} />
        { props.error && props.error.map(err => <p key={err} className="invalid">* {err}</p>)}
      </div>
    )
  }
}

export default Input;