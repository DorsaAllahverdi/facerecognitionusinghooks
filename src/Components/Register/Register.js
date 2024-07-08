import React from 'react';

const Register = ({onRouteChange}) => {
    return (
        <div>
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw8 center shadow-5">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="name"  id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={() => onRouteChange('signin')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                        </div>
                    </form>
                </main>
            </article>
            <div className="pa2 ba b--red w-70 center shadow-2 mb3">
                <p className="f4">This project is designed with a front-end interface and does not include backend authentication. Therefore, there is no need to register your account. Simply go to "Sign In" page and click the "Sign in" button to access the face recognition feature.</p>
            </div>
        </div>
    );
  }

export default Register;