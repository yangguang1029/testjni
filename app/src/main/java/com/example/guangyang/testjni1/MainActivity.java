package com.example.guangyang.testjni1;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TestJNI t = new TestJNI();

//         Log.e("fuck", "fuck..........start");
//         TestStatic2 t2 = new TestStatic2();
//         Log.e("fuck", "fuck............................");
//         TestStatic1 t1 = new TestStatic1();

    }
}
