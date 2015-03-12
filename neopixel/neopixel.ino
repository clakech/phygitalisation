#include <Adafruit_NeoPixel.h>

#define PRODUCT_NB_LED 11
#define PRODUCT_PIN 7

Adafruit_NeoPixel *bus;

void setup() {
  Serial.begin(115200);

  bus = new Adafruit_NeoPixel(PRODUCT_NB_LED, PRODUCT_PIN);
  bus->begin();
  bus->show();

  Serial.println("Setup ok");
}

void loop() {

  if(Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');

    switch (command[0]) {

    case '0': // led OFF
      changeColor(command, bus->Color(0, 0, 0));
      break;

    case '1': // LED ON
      changeColor(command, bus->Color(0, 0, 255));
      break;

    case 'S': //SHOW
      bus->show();
      delay(50);
      break;
    }
  }
}

void changeColor(String command, uint32_t color) {
  if (command[1] == 'A') {
    for (int i = 0 ; i < PRODUCT_NB_LED; i++){
      bus->setPixelColor(i, color);
    }
  } 
  else {
    bus->setPixelColor(command.substring(1).toInt(), color);
  }
}











