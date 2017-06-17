// https://stackoverflow.com/questions/12820953/asynchronous-script-loading-callback
function async(u, c) {
  var d = document, t = 'script',
      o = d.createElement(t),
      s = d.getElementsByTagName(t)[0];
  o.src = u;
  if (c) { o.addEventListener('load', function (e) { c(null, e); }, false); }
  s.parentNode.insertBefore(o, s);
}

var haven = {};
var Firebase = {};
(function(container, firebasecontainer) {
	container.loading = true;
	container.firebaseConfig = {
		apiKey: "AIzaSyBV4xN4d4WltQaUkjDHeEXvoQof0i292GE",
		authDomain: "haven-c0b14.firebaseapp.com",
		databaseURL: "https://haven-c0b14.firebaseio.com",
		projectId: "haven-c0b14",
		storageBucket: "haven-c0b14.appspot.com",
		messagingSenderId: "1069077617635"
	};

	var FirebaseFactory = {
		init: function(firebase, firebaseConfig, FirebaseFactory) {
			firebase.initializeApp(firebaseConfig);

			var fba = firebase.auth();
			return {
				requestAuthentication: function(success, failure) {
					fba.signInWithPopup(FirebaseFactory.authProvider()).then(function(result) {
						success(FirebaseFactory.processAuthResult(result));
					}).catch(function(e) {
						failure(e);
					});
				},

				signOut: function() {
					fba.signOut();
				},

				getCurrentUser: function() {
					return FirebaseFactory.processCurrentUser(fba.currentUser)
				},

				isLoggedIn: function() {
					return fba.currentUser != null
				}
			}
		},

		authProvider: function() {
			var provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope('profile'); provider.addScope('email');
			return provider;
		},

		processAuthResult: function(authResult) {
			return { 
				accessToken: result.credential.accessToken,
				name: result.user.displayName,
				email: result.user.email,
				phone: result.user.phoneNumber,
				photo: result.user.photoURL
			};
		},

		processCurrentUser: function(currentUser) {
			return {
				name: currentUser.displayName,
				email: currentUser.email,
				phone: currentUser.phoneNumber,
				photo: currentUser.photoURL
			};
		}
	};

	var FirebaseEvents = {
		scriptInjectLoaded: function() {
			Firebase = FirebaseFactory.init(firebase, container.firebaseConfig, FirebaseFactory);

			container.loading = false;

			if (container.firebaseScriptInjectLoaded) {
				container.firebaseScriptInjectLoaded();
			}
		}
	};

	window.onload = function() {
		async("https://www.gstatic.com/firebasejs/4.1.2/firebase.js", FirebaseEvents.scriptInjectLoaded);
	};
})(haven);
