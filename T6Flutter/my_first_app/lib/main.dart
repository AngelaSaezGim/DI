import 'package:english_words/english_words.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// CON CONTROL Y CLICK PODEMOS VER LA DOCUMENTACIÓN

//solo le indica a Flutter que ejecute la app definida en MyApp.
void main() {
  runApp(MyApp());
}

//MyApp;
//extiende StatelessWidget. Los widgets son los elementos a partir de los cuales compilarás cada app de Flutter. La propia app es un widget.
class MyApp extends StatelessWidget {
  //Le asigna un nombre a la app,
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    //El estado se crea y se brinda a toda la app mediante un ChangeNotifierProvider
    return ChangeNotifierProvider(
      create: (context) => MyAppState(),
      child: MaterialApp(
        title: 'Namer App',
        //define el tema visual
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
              seedColor: const Color.fromARGB(255, 25, 250, 107)),
        ),
        home: MyHomePage(),
      ),
    );
  }
}

//MyAppState - define el estado de la app;
//define los datos que la app necesita para funcionar.
//1 manera de gestionarlo -  ChangeNotifier
//ChangeNotifier, puede notificar a otros acerca de sus cambios. Ej, si el par actual de palabras cambia, algunos widgets de la app deben saber eso
//*Usa changeNotifierProvider - le permite a cualquier widget de la app obtener el estado.
class MyAppState extends ChangeNotifier {
  var current = WordPair
      .random(); // se puede generar palabras random en una lista con .random

  //método getNext.
  void getNext() {
    // reasignará el elemento current con un nuevo WordPair aleatorio.
    current = WordPair.random();
    //Llamará a notifyListeners() (método de ChangeNotifier) que garantiza que se notifique a todo elemento que esté mirando a MyAppState.
    notifyListeners();
  }

  //Metodo añadir boton me gusta
  //. Esta propiedad se inicializa con una lista vacía: [].
  // lista solo puede contener ciertos pares de palabras: <WordPair>[]
  //PARA ESTO SE PODRIA USAR LIST O TAMBIEN SET {}
  var favorites = <WordPair>[];

//método, toggleFavorite(), que quita el par actual de palabras de la lista (si ya está en ella) o lo agrega a ella (si aún no está allí).
//Cuando termina llama a notifyListeners();
//Se crea lista Favorite
  void toggleFavorite() {
    if (favorites.contains(current)) {
      favorites.remove(current);
    } else {
      favorites.add(current);
    }
    notifyListeners();
  }
}

//el widget que ya modificaste
//Refactor Convert to StatefulWidget. - EXTENDS STATEFUL WIDGET
class MyHomePage extends StatefulWidget {
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

//El IDE crea una nueva clase para ti, _MyHomePageState
//Esta clase extiende State y, por lo tanto, puede administrar sus propios valores (puede cambiarse a sí misma).
//El guion bajo (_) del comienzo de _MyHomePageState hace que la clase sea privada
class _MyHomePageState extends State<MyHomePage> {
  //El nuevo widget con estado solamente necesita realizar el seguimiento de una variable: selectedIndex
  //Establecerás una nueva variable desde el inicio de todo, selectedIndex, y la inicializarás en 0.
  var selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    Widget page;
    //asigna una pantalla a page, según el valor actual de selectedIndex.
    //PAGE SE APLICARA A EXPANDED QUE ES LO QUE TIENE QUE CAMBIAR
    switch (selectedIndex) {
      case 0:
        page = GeneratorPage();
        break;
      case 1:
        //Dado que todavía no existe, usa Placeholder - lo que indica que esa parte de la IU no está terminada.
        //page = Placeholder();
         page = FavoritesPage();
        break;
      default:
        throw UnimplementedError('no widget for $selectedIndex');
    }

    return LayoutBuilder(
      builder: (context, constraints) {
        return Scaffold(
          //La nueva MyHomePage contiene una Row con dos elementos secundarios. El primer widget es SafeArea, y el segundo es un widget de Expanded.
          // Los widgets expandidos son sumamente útiles en filas y columnas: te permiten expresar diseños donde algunos elementos secundarios
          // ocupan solo el espacio que necesitan (en este caso, NavigationRail) y otros widgets deberían ocupar tanto espacio del restante como sea posible (en este caso, Expanded).
          body: Row(
            // se extrajo en un widget nuevo, GeneratorPage
            children: [
              //SafeArea garantiza que sus elementos secundarios no se muestren oscurecidos por un recorte de hardware o una barra de estado.
              SafeArea(
                //En esta app, el widget se une a NavigationRail
                child: NavigationRail(
                  // Esto mostrará las etiquetas junto a los íconos. 
                  //¿QUEREMOS QUE SEA RESPONSIVE? - muestre automáticamente las etiquetas (usando extended: true) cuando haya suficiente espacio para ellas.
                  /*Dentro del método build de _MyHomePageState, coloca el cursor en Scaffold.
                  Despliega el menú Refactor con Ctrl+. (Windows/Linux) o Cmd+. (Mac).
                  Selecciona Wrap with Builder y presiona Intro.
                  Modifica el nombre del Builder agregado recientemente por LayoutBuilder. - AHORA NO SERA BUILDER SERA LAYOUTBUILDER EL RETURN
                  Cambia la lista de parámetros de devolución de llamada de (context) a (context, constraints).
                  */
                  extended: constraints.maxWidth >= 600,
        
                  destinations: [
                    //El riel de navegación tiene dos destinos (Home y Favorites), con sus respectivos íconos y etiquetas.
                    NavigationRailDestination(
                      icon: Icon(Icons.home),
                      label: Text('Home'),
                    ),
                    NavigationRailDestination(
                      icon: Icon(Icons.favorite),
                      label: Text('Favorites'),
                    ),
                  ],
                  //define el selectedIndex actual. 0=primer destino,home, 1=Favorite
                  //Necesitas alguna manera de conservar el valor del selectedIndex
                  //de selectedIndex: 0, a
                  //Usarás esta nueva variable en la definición de NavigationRail
                  selectedIndex: selectedIndex, //ESTADO
                  //define qué ocurre cuando el usuario selecciona uno de los destinos con onDestinationSelected.
                  //querrás cambiar este valor desde adentro de la devolución de llamada de onDestinationSelected
                  /*
                  onDestinationSelected: (value) {
                    //Por ahora, la app solo mostrará el valor del índice requerido con print()
                    print('selected: $value');
                  },*/
                  onDestinationSelected: (value) {
                    //NAVEGACION
                    //en lugar de solo imprimir el valor nuevo en la consola, lo asignarás a selectedIndex dentro de una llamada a setState()
                    setState(() {
                      selectedIndex = value;
                    }); //Ahora el riel responderá
                  },
                ),
              ),
              //Ocupa el espacio restante
              Expanded(
                //Container de color
                child: Container(
                  color: Theme.of(context)
                      .colorScheme
                      .primaryContainer, //Color de fondo
                  child:
                      page, // dentro de este está el elemento GeneratorPage. - lo que se hace en esa pagina
                ),
              ),
            ],
          ),
        );
      }
    );
  }
}

class GeneratorPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var appState = context.watch<MyAppState>();
    var pair = appState.current;

    IconData icon;
    if (appState.favorites.contains(pair)) {
      icon = Icons.favorite;
    } else {
      icon = Icons.favorite_border;
    }

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          BigCard(pair: pair),
          SizedBox(height: 10),
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              ElevatedButton.icon(
                onPressed: () {
                  appState.toggleFavorite();
                },
                icon: Icon(icon),
                label: Text('Like'),
              ),
              SizedBox(width: 10),
              ElevatedButton(
                onPressed: () {
                  appState.getNext();
                },
                child: Text('Next'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class FavoritesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //Obtiene el estado actual de la app.
    var appState = context.watch<MyAppState>();

    if (appState.favorites.isEmpty) {
      return Center(
        child: Text('No favorites yet.'),
      );
    }

    return ListView(
      children: [
        Padding(
          padding: const EdgeInsets.all(20),
          child: Text('You have '
              '${appState.favorites.length} favorites:'),
        ),
        for (var pair in appState.favorites)
          ListTile(
            leading: Icon(Icons.favorite),
            title: Text(pair.asLowerCase),
          ),
      ],
    );
  }
}

// ...
//menú Refactor en el widget de Text
//Wrap with Padding.
class BigCard extends StatelessWidget {
  const BigCard({
    super.key,
    required this.pair,
  });

  final WordPair pair;

  @override
  Widget build(BuildContext context) {
    // Añadir tema, colores - el código solicita el tema actual de la app con Theme.of(context).
    //PARA CAMBIAR LOS COLORES DE LA APP IREMOS A ColorScheme
    final theme = Theme.of(context);

    //Problema texto es demasido pequeño
    //theme.textTheme,, accedes al tema de la fuente de tu app (bodyMedium,caption,headlineLarge..)
    //! La propiedad displayMedium podría ser null
    final style = theme.textTheme.displayMedium!.copyWith(
      //copyWith() = copia del estilo del texto con los cambios que definas.
      color: theme.colorScheme.onSecondary,
    );

    return Card(
      /*El código define el color de la tarjeta de modo que sea el mismo que el de la propiedad colorScheme del tema. 
      El esquema de colores contiene varios de ellos, y primary es el más destacado y el que define el color de la app.
      */
      color: theme.colorScheme.primary, //Añadirle color con el thema

      //elevation sirve para dar sombreado a la tarjeta
      elevation: 40,

      //Esto creará un nuevo widget superior alrededor del widget de Text llamado Padding (Refactor - wrap paddinf)
      child: Padding(
        // Coloca el cursor en el widget de Padding, despliega el menú Refactor y selecciona Wrap with widget… Card
        //Esto une el widget de Padding, y, por lo tanto, también el Text, con un widget de Card. (ambos son cajitas ahora)
        padding: const EdgeInsets.all(20), //padding 20

        //style = Estilo para texto
        //pair.asLowerCase con "${pair.first} ${pair.second}" - RESPONSIVE lectores de pantalla las identifiquen de forma correcta
        child: Text(
          pair.asLowerCase,
          style: style, //Medium, y concordante con el color
          semanticsLabel: "${pair.first} ${pair.second}",
        ),
      ),
    );
  }
}
