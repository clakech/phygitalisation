#include <Adafruit_NeoPixel.h>

#define PRODUCT_NB_LED 11
#define PRODUCT_PIN 6

String command;
Adafruit_NeoPixel *bus;
uint32_t color = bus->Color(0, 0, 255);

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

    Serial.println(command);

    switch (command[1]) {

    case 'O': // led OFF
      if (command[2] == 'A'){
        applyOnAllLed(bus, PRODUCT_NB_LED, bus->Color(0, 0, 0));
      } 
      else {
        bus->setPixelColor(command.substring(2).toInt(), bus->Color(0, 0, 0));
      }
      break;

    case 'L': // LED ON
      if (command[2] == 'A'){
        applyOnAllLed(bus, PRODUCT_NB_LED, color);
      }
      else{
        bus->setPixelColor(command.substring(2).toInt(), color);
      }
      break;

    case 'S': //SHOW
      bus->show();
      delay(50);
      break;
    }
  }
}

void applyOnAllLed(Adafruit_NeoPixel *bus, short numPixels, uint32_t c) {
  for (int i = 0 ; i< numPixels; i++){
    bus->setPixelColor(i, c);
  }
}










