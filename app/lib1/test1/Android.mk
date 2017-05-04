LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
LOCAL_MODULE := libfuck11


LOCAL_LDLIBS += -L$(SYSROOT)/usr/lib -llog

LOCAL_SRC_FILES := test11.cpp


include $(BUILD_SHARED_LIBRARY)