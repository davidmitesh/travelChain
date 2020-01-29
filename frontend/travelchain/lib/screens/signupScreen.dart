import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class SignupScreen extends StatefulWidget {
  @override
  _SignupScreenState createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final Widget signupImage = SvgPicture.asset(
    'assets/images/signup.svg',
    semanticsLabel: 'signuplogo',
  );
  bool _visible = false;
  TextEditingController _usernameController;
  TextEditingController _passwordController;
  TextEditingController _confirmPasswordController;
  TextEditingController _emaliController;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).backgroundColor,
      body: SingleChildScrollView(
        physics: BouncingScrollPhysics(),
        child: Center(
          child: Padding(
            padding: EdgeInsets.all(20.0),
            child: Column(
              children: <Widget>[
                Text("Sign Up",
                    style: TextStyle(
                        fontSize: 25.0,
                        color: Colors.black87,
                        fontWeight: FontWeight.bold)),
                SizedBox(
                  height: 20.0,
                ),
                Container(
                  width: double.infinity,
                  height: 150.0,
                  child: Stack(
                    children: <Widget>[
                      signupImage,
                      Align(
                        alignment: Alignment.topLeft,
                        child: Hero(
                          tag: 'travelChainHero',
                          child: RichText(
                            text: TextSpan(
                              text: 'travel',
                              style: TextStyle(
                                  fontSize: 16.0, color: Color(0xff343a45)),
                              children: <TextSpan>[
                                TextSpan(
                                    text: 'Chain',
                                    style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        color: Color(0xff073b94),
                                        fontSize: 20.0))
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(
                  height: 15.0,
                ),
                TextFormField(
                  controller: _usernameController,
                  decoration: InputDecoration(
                      prefixIcon: Icon(Icons.person),
                      hasFloatingPlaceholder: true,
                      hintText: "username"),
                ),
                SizedBox(
                  height: 15.0,
                ),
                TextFormField(
                  controller: _usernameController,
                  decoration: InputDecoration(
                      prefixIcon: Icon(Icons.email),
                      hasFloatingPlaceholder: true,
                      hintText: "email"),
                ),
                SizedBox(
                  height: 15.0,
                ),
                TextFormField(
                  controller: _passwordController,
                  decoration: InputDecoration(
                    prefixIcon: Icon(Icons.lock),
                    hasFloatingPlaceholder: true,
                    hintText: "password",
                    suffixIcon: IconButton(
                      icon: (_visible)
                          ? Icon(Icons.visibility)
                          : Icon(Icons.visibility_off),
                      onPressed: () {
                        setState(() {
                          _visible = !_visible;
                        });
                      },
                    ),
                  ),
                  obscureText: !_visible,
                ),
                SizedBox(
                  height: 15.0,
                ),
                TextFormField(
                  controller: _passwordController,
                  decoration: InputDecoration(
                    prefixIcon: Icon(Icons.verified_user),
                    hasFloatingPlaceholder: true,
                    hintText: "confirm password",
                    suffixIcon: IconButton(
                      icon: (_visible)
                          ? Icon(Icons.visibility)
                          : Icon(Icons.visibility_off),
                      onPressed: () {
                        setState(() {
                          _visible = !_visible;
                        });
                      },
                    ),
                  ),
                  obscureText: !_visible,
                ),
                SizedBox(
                  height: 15.0,
                ),
                Container(
                  width: MediaQuery.of(context).size.width * 0.5,
                  child: RaisedButton(
                    child: Text("Sign Up"),
                    textColor: Colors.white,
                    color: Color(0xff073b94),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20.0),
                    ),
                    onPressed: () {},
                  ),
                ),
                SizedBox(
                  height: 15.0,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Text("Already have an account? ",
                        style: TextStyle(color: Colors.black54)),
                    GestureDetector(
                      onTap: () {},
                      child: Text(
                        "Login",
                        style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Color(0xff073b94)),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
