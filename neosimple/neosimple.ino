#include <Adafruit_NeoPixel.h>

#define NB_LED 60
#define PIN 7

Adafruit_NeoPixel *bus;

void setup() {
  Serial.begin(115200);

  bus = new Adafruit_NeoPixel(NB_LED, PIN);
  bus->begin();
  bus->show();
}

void loop() {
  for(int i = 0; i < NB_LED ; i++) {

    bus->setPixelColor(i, bus->Color(0,150,0)); 

    bus->show();
    
    delay(200); 

  }
  
  for(int i = 0; i < NB_LED ; i++) {

    bus->setPixelColor(i, bus->Color(0,0,150)); 

    bus->show();
    
    delay(200); 

  }
}

