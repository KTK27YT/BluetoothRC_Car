#include <SoftwareSerial.h>
SoftwareSerial mySerial(12, 13); //Rx,Tx
char t;
int motor1pin1 = 2;
int motor1pin2 = 3;

int motor2pin1 = 4;
int motor2pin2 = 5;
void setup() {
  // put your setup code here, to run once:
  pinMode(motor1pin1, OUTPUT);
  pinMode(motor1pin2, OUTPUT);
  pinMode(motor2pin1, OUTPUT);
  pinMode(motor2pin2, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
  mySerial.begin(9600);

}

void loop() {
     if (mySerial.available()) {
       t = mySerial.read();
       Serial.println(t);
     }
    if( t == 'W'){
        analogWrite(9, 100);
        analogWrite(10, 100);
        digitalWrite(motor1pin1, HIGH);
        digitalWrite(motor1pin2, LOW);
        digitalWrite(motor2pin1, HIGH);
        digitalWrite(motor2pin2, LOW);
        digitalWrite(LED_BUILTIN, HIGH);
        delay(100);
        t = "";
        analogWrite(9, 0);
        digitalWrite(motor1pin1, LOW);
        digitalWrite(motor1pin2, LOW);
        analogWrite(10, 0);
        digitalWrite(motor2pin1, LOW);
        digitalWrite(motor2pin2, LOW);
    }
    if( t == 'S'){
        analogWrite(9, 100);
        analogWrite(10, 100);
        digitalWrite(motor1pin1, LOW);
        digitalWrite(motor1pin2, HIGH);
        digitalWrite(motor2pin1, LOW);
        digitalWrite(motor2pin2, HIGH);
        digitalWrite(LED_BUILTIN, HIGH);
        delay(100);
        t = "";
        analogWrite(9, 0);
        digitalWrite(motor1pin1, LOW);
        digitalWrite(motor1pin2, LOW);
        analogWrite(10, 0);
        digitalWrite(motor2pin1, LOW);
        digitalWrite(motor2pin2, LOW);
    }
    if( t == 'A'){
        analogWrite(9, 100);
        analogWrite(10, 100);
        digitalWrite(motor1pin1, LOW);
        digitalWrite(motor1pin2, HIGH);
        digitalWrite(motor2pin1, HIGH);
        digitalWrite(motor2pin2, LOW);
        delay(100);
        t = "";
        analogWrite(9, 0);
        digitalWrite(motor1pin1, LOW);
        digitalWrite(motor1pin2, LOW);
        analogWrite(10, 0);
        digitalWrite(motor2pin1, LOW);
        digitalWrite(motor2pin2, LOW);
    }
    if (t == 'D'){
      analogWrite(9, 100);
      analogWrite(10, 100);
      digitalWrite(motor1pin1, HIGH);
      digitalWrite(motor1pin2, LOW);
      digitalWrite(motor2pin1, LOW);
      digitalWrite(motor2pin2, HIGH);
      delay(100);
      t = "";
      analogWrite(9, 0);
      digitalWrite(motor1pin1, LOW);
      digitalWrite(motor1pin2, LOW);
      analogWrite(10, 0);
      digitalWrite(motor2pin1, LOW);
      digitalWrite(motor2pin2, LOW);
    }
     
}