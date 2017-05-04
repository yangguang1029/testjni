LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
LOCAL_MODULE := libinclude1

LOCAL_C_INCLUDES := $(LOCAL_PATH) 

LOCAL_LDLIBS += -L$(SYSROOT)/usr/lib -llog
                    
LOCAL_SRC_FILES := include1.cpp


include $(BUILD_SHARED_LIBRARY)