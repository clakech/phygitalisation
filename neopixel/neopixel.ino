#include <Adafruit_NeoPixel.h>

#define NB_LED 11
#define PIN 7

Adafruit_NeoPixel *bus;

void setup() {
  Serial.begin(115200);

  bus = new Adafruit_NeoPixel(NB_LED, PIN);
  bus->begin();
  bus->show();

  Serial.println("Setup ok");
}

void loop() {

  if(Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');

    switch (command[0]) {

    case '0': // leds OFF
      for (int i = 0 ; i < NB_LED; i++){
        bus->setPixelColor(i, bus->Color(0, 0, 0));
      }
      break;

    case '1': // LED ON
      bus->setPixelColor(command.substring(1).toInt(), bus->Color(0, 0, 255));
      break;

    case 'S': //SHOW
      bus->show();
      delay(50);
      break;
    }
  }
}












