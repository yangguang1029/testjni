LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
LOCAL_MODULE := libtest1

LOCAL_C_INCLUDES := $(LOCAL_PATH)
LOCAL_SRC_FILES := test1.cpp

LOCAL_LDLIBS += -L$(SYSROOT)/usr/lib -llog

#LOCAL_SHARED_LIBRARIES := libsub11

include $(BUILD_SHARED_LIBRARY)

#$(call import-add-path, $(LOCAL_PATH))
#$(call import-module, cpp11)