dIniciar proyecto

Explorer y abre el archivo pubspec.yaml.
Limpio;
name: namer_app
description: A new Flutter project.

```yaml
publish_to: 'none' # Remove this line if you wish to publish to pub.dev

version: 0.0.1+1

environment:
  sdk: '>=2.19.4 <4.0.0'

dependencies:
  flutter:
    sdk: flutter

  english_words: ^4.0.0
  provider: ^6.0.0

dev_dependencies:
  flutter_test:
    sdk: flutter

  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true
```

Buscar archivo analysis_options.yaml

```yaml
include: package:flutter_lints/flutter.yaml

linter:
  rules:
    prefer_const_constructors: false
    prefer_final_fields: false
    use_key_in_widget_constructors: false
    prefer_const_literals_to_create_immutables: false
    prefer_const_constructors_in_immutables: false
    avoid_print: false
```

main.dart en directorio lib/.

```Dart
import 'package:english_words/english_words.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => MyAppState(),
      child: MaterialApp(
        title: 'Namer App',
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepOrange),
        ),
        home: MyHomePage(),
      ),
    );
  }
}

class MyAppState extends ChangeNotifier {
  var current = WordPair.random();
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var appState = context.watch<MyAppState>();

    return Scaffold(
      body: Column(
        children: [
          Text('A random idea:'),
          Text(appState.current.asLowerCase),
        ],
      ),
    );
  }
}
```

Agregar un Botón

A continuación, agrega un botón en la parte inferior de Column, justo debajo de la segunda instancia de Text.

Mirar codigo y como le aplicamos la funcion getNext()


Extrae un widget

línea responsable de mostrar el par actual de palabras tiene el siguiente aspecto: Text(appState.current.asLowerCase)
extraer esta línea en un widget independiente. 

Flutter ofrece un método auxiliar de refactorización que extrae widgets

(mirar codigo)
Click Derecho, refactor, Extract Widget

Tema y estilo

Para lograr que la tarjeta se destaque más, píntala con un color más intenso. 
buena idea mantener un esquema de colores coherente, usa el Theme de la app para elegir el color.

Centra la IU

BigCard es parte de una Column.
 De forma predeterminada, las columnas agrupan sus elementos secundarios en la parte superior, pero podemos anular esto con facilidad. 

Añadir boton corazon y button.ico

 Agrega un riel de navegación
 crearás una pantalla independiente para los favoritos del usuario. Para alternar entre las dos pantallas, implementarás tu primer StatefulWidget.

 MyHomePage original;

 
class MyHomePage extends StatelessWidget {
  @override
  //Cada widget define un método build() que se llama automáticamente cada vez que cambian las circunstancias del widget = siempre esté actualizado.
  Widget build(BuildContext context) {
    //MyHomePage realiza el seguimiento del estado actual de la app usando el método watch.
    var appState = context.watch<MyAppState>();
    var pair = appState.current; //para usarlo después

    //MANEJO ICONOS
    IconData icon;
    if (appState.favorites.contains(pair)) {
      icon = Icons.favorite;
    } else {
      icon = Icons.favorite_border;
    }

  //Cada método build debe mostrar un widget o un árbol de widgets anidado (usamos esto). 
  // Arbol
  //Nivel Superior = Scaffold
  //Mas abajo = Column
  //Dentro 1 Children
  //Dentro del Children = 1 Text (2 Widgets) y 1 Button
    return Scaffold(
      //Puedes centrar la columna. Coloca el cursor sobre Column, Refactory selecciona Wrap with Center. - ahora la column sera hija de center
      body: Center(
        child: Column(
        
          mainAxisAlignment: MainAxisAlignment.center,  // CENTRAR ELEMENTOS (en vertical)
          //Falta horizontal - Arriba
        
          children: [
            //Text('A random AWESOME idea:'),

            //toma el appState>accede al único miembro de esa clase, current (que es un WordPair)
            //WordPair proporciona varios métodos get de utilidad, como asPascalCase o asSnakeCase o asLowerCase
            //Text(appState.current.asLowerCase), //usa comas finales 
            //SI APLICAMOS METODO NEXT CAMBIARÁN LAS PALABRAS ALEATORIAS
            //con widget;
            //de Text(pair.asLowerCase),  
            //Click Derecho, refactor, Extract Widget
            //a
            BigCard(pair: pair), 

            //Widget para dar espaciado entre Widgets con utlidades
            SizedBox(height: 10),
        
            // BUTTON.
            //Y SI QUIERO AÑADIR MAS BOTONES EN FILA? - cursor en ElevatedButton - Refactor - Wrap with Row.
            Row(
              // agrupa sus elementos secundarios a la izquierda (TODA = queda mal)
              mainAxisSize: MainAxisSize.min,  // Esto le indica a Row que no debe ocupar todo el espacio horizontal disponible.
              children: [
                //BOTTON LIKE = USANDO ICON
                ElevatedButton.icon(
                  onPressed: () {
                    // llamar al método
                    appState.toggleFavorite();
                  },
                  //Funciona igual pero en vez de text ponemos el icono
                  icon: Icon(icon),
                  label: Text('Like'),
                ),
                 SizedBox(width: 15),
                //BOTTON NEXT
                ElevatedButton(
                  onPressed: () {
                    // llamar al método getNext desde la devolución de llamada del botón.
                    appState.getNext();
                    print('button pressed!'); //Terminal
                  },
                  child: Text('Next'), //Texto que se mostrará en botón
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

  divide MyHomePage en 2 widgets independientes. (NavigationRail y Extended) - codigo
  +Hemos añadido GeneratorPage


  Widgets con estado

  Antes;  No contienen ningún estado mutable propio. Ninguno de los widgets puede cambiarse a sí mismo: todos deben pasar por MyAppState.

NAVEGAR
  Necesitas alguna manera de conservar el valor del selectedIndex del riel de navegación. También querrás cambiar este valor desde adentro de la devolución de llamada de onDestinationSelected.

Ingresa el StatefulWidget, un tipo de widget que tiene State.
 Primero, convierte MyHomePage a un widget con estado.

  cursor en la primera línea de MyHomePage (la que empieza con class MyHomePage...) y despliega el menú Refactor usando Ctrl+. o Cmd+.. Luego, selecciona Convert to StatefulWidget.
  class _MyHomePageState extends State<MyHomePage> {

***MIRAR CODIGO**

NAVEGACION PAGINAS

RAIL DE NAVEGACION RESPONSIVE


AGREGAR NUEVA PAGINA FAVOURITES

Tu objetivo es mostrar la lista de favorites en un widget nuevo y sin estado, FavoritesPage, y luego mostrar ese widget en lugar del Placeholder.