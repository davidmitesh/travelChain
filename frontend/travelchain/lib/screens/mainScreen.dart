import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:flutter_icons/flutter_icons.dart';

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  TextEditingController _searchController;
  GoogleMapController mapController;
  String _searchAddr;
  bool _fabTap = false;
  var currentLocation;
  bool mapToggle = false;

  List<IconData> _chipIcons = [
    Icons.restaurant,
    Icons.local_drink,
    Icons.local_movies,
    Icons.local_grocery_store,
  ];

  List<String> _chipValue = ["Restaurant", "Pub", "Movie", "Grocery Store"];
  int _selectedIndex = 0;

  Set<Marker> markerSet = new Set();

  @override
  void initState() {
    super.initState();
    _searchController = TextEditingController();

    Geolocator()
        .getCurrentPosition(desiredAccuracy: LocationAccuracy.high)
        .then((currLoc) {
      setState(() {
        currentLocation = currLoc;
        mapToggle = true;
        markerSet.add(Marker(
          markerId: MarkerId("marker_id_1"),
          position: LatLng(currentLocation.latitude, currentLocation.longitude),
          infoWindow: InfoWindow(
              title: "Trekking",
              snippet: "Walkathon to Poon Hill",
              onTap: () {}),
        ));
      });
    });
  }

  void onMapCreated(controller) {
    setState(() {
      mapController = controller;
    });
  }

  _searchLocations() {
    Geolocator().placemarkFromAddress(_searchAddr).then((result) {
      mapController.animateCamera(CameraUpdate.newCameraPosition(
        CameraPosition(
          target:
              LatLng(result[0].position.latitude, result[0].position.longitude),
          zoom: 15.0,
        ),
      ));
      if (result.length != 0) {
        markerSet.add(Marker(
            markerId: MarkerId("${result[0].name}"),
            position: LatLng(
                result[0].position.latitude, result[0].position.longitude),
            infoWindow: InfoWindow(
                title: "${result[0].locality}",
                snippet: "Lets travel",
                onTap: () {}),
            onTap: () {}));
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          elevation: 12.0,
          currentIndex: _selectedIndex,
          onTap: (int index) {
            setState(() {
              _selectedIndex = index;
            });
          },
          items: [
            BottomNavigationBarItem(
                icon: Icon(Icons.trending_up), title: Text("Trending")),
            BottomNavigationBarItem(
                icon: Icon(Icons.account_balance_wallet),
                title: Text("Redeem")),
            BottomNavigationBarItem(
                icon: Icon(Icons.security), title: Text("Private")),
            BottomNavigationBarItem(
                icon: Icon(Icons.inbox), title: Text("Inbox")),
          ],
        ),
        floatingActionButton: SpeedDial(
          elevation: 10.0,
          overlayOpacity: 0.0,
          curve: Curves.easeInOut,
          visible: true,
          backgroundColor:
              _fabTap ? Colors.pinkAccent : Theme.of(context).primaryColor,
          closeManually: false,
          animatedIcon: AnimatedIcons.menu_close,
          onOpen: () {
            setState(() {
              _fabTap = true;
            });
          },
          onClose: () {
            setState(() {
              _fabTap = false;
            });
          },
          children: [
            SpeedDialChild(
              child: Icon(Icons.add),
              onTap: () {
                print("add");
              },
              backgroundColor: Theme.of(context).primaryColor,
            ),
            SpeedDialChild(
              child: Icon(Icons.location_searching),
              onTap: () {
                print("locate");
              },
            ),
          ],
        ),
        backgroundColor: Theme.of(context).backgroundColor,
        body: Stack(
          children: <Widget>[
            Container(
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height,
              // color: Colors.pinkAccent,
              child: mapToggle
                  ? GoogleMap(
                      onMapCreated: onMapCreated,
                      initialCameraPosition: CameraPosition(
                        target: LatLng(currentLocation.latitude,
                            currentLocation.longitude),
                        zoom: 15.0,
                      ),
                      markers: markerSet,
                    )
                  : Center(child: CircularProgressIndicator()),
            ),
            Positioned(
              top: 10.0,
              right: 20.0,
              left: 20.0,
              child: Column(
                children: <Widget>[
                  Container(
                    height: 47.0,
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(8.0),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.grey,
                            blurRadius: 10.0,
                          )
                        ]),
                    child: TextFormField(
                      keyboardType: TextInputType.text,
                      controller: _searchController,
                      onTap: () {},
                      onChanged: (val) {
                        setState(() {
                          _searchAddr = val;
                        });
                      },
                      textAlignVertical: TextAlignVertical.center,
                      decoration: InputDecoration(
                        prefixIcon: IconButton(
                          onPressed: () {},
                          icon: Icon(Icons.menu),
                        ),
                        suffixIcon: SizedBox(
                          height: double.infinity,
                          width: 96.0,
                          child: Row(
                            children: <Widget>[
                              IconButton(
                                onPressed: _searchLocations,
                                icon: Icon(Icons.search),
                              ),
                              Padding(
                                padding: EdgeInsets.only(
                                    right: 8.0, top: 8.0, bottom: 8.0),
                                child: GestureDetector(
                                  onTap: () {},
                                  child: CircleAvatar(
                                    child: Text("A"),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        border: InputBorder.none,
                        hintText: 'Search Challenges',
                      ),
                    ),
                  ),
                  Container(
                    height: 50.0,
                    child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: _chipValue.length,
                        itemBuilder: (context, index) {
                          return Row(
                            children: <Widget>[
                              Chip( 
                                backgroundColor: Colors.white,
                                elevation: 5.0,
                                avatar: Icon(_chipIcons[index],
                                    color: Colors.black54, size: 15.0),
                                label: Text("${_chipValue[index]}"),
                              ),
                              SizedBox(
                                width: 5.0,
                              )
                            ],
                          );
                        }),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
