#include <iostream>
#include "com_example_guangyang_testjni1_TestJNI.h"

#include "test1.h"

using namespace std;

extern void test1();

void Java_com_example_guangyang_testjni1_TestJNI_test
  (JNIEnv *env, jobject jo){
  	cout << "fuck in test2" << endl;
	Test1* t = new Test1();
  }

