import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_svg/svg.dart';
import 'package:travelchain/screens/mainScreen.dart';
import 'package:travelchain/screens/signupScreen.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final Widget loginImage = SvgPicture.asset(
    'assets/images/loginlogo.svg',
    semanticsLabel: 'travelChain logo',
  );
  TextEditingController _usernameController;
  TextEditingController _passwordController;

  bool _visible = false;
  @override
  void initState() {
    _usernameController = TextEditingController();
    _passwordController = TextEditingController();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async => false,
      child: SafeArea(
        child: Scaffold(
          backgroundColor: Theme.of(context).backgroundColor,
          body: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: <Widget>[
                      Text("Sign In",
                          style: TextStyle(
                              fontSize: 25.0,
                              color: Colors.black87,
                              fontWeight: FontWeight.bold)),
                      SizedBox(
                        height: 30.0,
                      ),
                      Container(
                        width: double.infinity,
                        height: 170.0,
                        child: Stack(
                          children: <Widget>[
                            loginImage,
                            Align(
                              alignment: Alignment.bottomLeft,
                              child: Hero(
                                tag: 'travelChainHero',
                                child: RichText(
                                  text: TextSpan(
                                    text: 'travel',
                                    style: TextStyle(
                                        fontSize: 16.0,
                                        color: Color(0xff343a45)),
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
                        height: 30.0,
                      ),
                      TextFormField(
                        controller: _usernameController,
                        decoration: InputDecoration(
                            prefixIcon: Icon(Icons.person),
                            hasFloatingPlaceholder: true,
                            hintText: "username"),
                      ),
                      SizedBox(
                        height: 20.0,
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
                      Align(
                        child: Text(
                          "Forgot Password?",
                          style: TextStyle(
                            color: Color(0xff073b94),
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        alignment: Alignment.centerRight,
                      ),
                      SizedBox(
                        height: 20.0,
                      ),
                      Container(
                        width: MediaQuery.of(context).size.width * 0.5,
                        child: RaisedButton(
                          child: Text("Login"),
                          textColor: Colors.white,
                          color: Color(0xff073b94),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20.0),
                          ),
                          onPressed: () {
                            Navigator.push(
                              context,
                              CupertinoPageRoute(
                                  builder: (context) => MainScreen()),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 40.0,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text("Don't have an account? ",
                          style: TextStyle(color: Colors.black54)),
                      GestureDetector(
                        onTap: () {
                          Navigator.push(
                              context,
                              CupertinoPageRoute(
                                  builder: (context) => SignupScreen()));
                        },
                        child: Text(
                          "Sign Up",
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
      ),
    );
  }
}
