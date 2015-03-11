#include <Adafruit_NeoPixel.h>

#define PRODUCT_NB_LED 11
#define PRODUCT_PIN 7

String command;
Adafruit_NeoPixel *bus;

void setup() {
  Serial.begin(115200);

  bus = new Adafruit_NeoPixel(PRODUCT_NB_LED, PRODUCT_PIN, NEO_GRB + NEO_KHZ800);
  bus->begin();
  bus->show();
  delay(50); 

  Serial.println("Setup ok");
}

void loop() {

  if(Serial.available() > 0)
  {
    command = Serial.readStringUntil('\n');

    switch (command[0]) {

    case '0': // led OFF
      changeColor(bus->Color(0, 0, 0));
      break;

    case '1': // LED ON
      changeColor(bus->Color(0, 0, 255));
      break;

    case 'S': //SHOW
      bus->show();
      delay(50);
      break;
    }
  }
}

void changeColor(uint32_t color) {
  if (command[1] == 'A') {
    applyOnAllLed(bus, PRODUCT_NB_LED, color);
  } 
  else {
    bus->setPixelColor(command.substring(1).toInt(), color);
  }
}

void applyOnAllLed(Adafruit_NeoPixel *bus, short numPixels, uint32_t c) {
  for (int i = 0 ; i< numPixels; i++){
    bus->setPixelColor(i, c);
  }
}











