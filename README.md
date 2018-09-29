# webcam-broadcasting




commands to create 

sudo modprobe v4l2loopback exclusive_caps=1
v4l2-ctl --list-devices
ffmpeg -f x11grab -r 15 -s 1920x1080 -i :0.0+0,0 -vcodec rawvideo -pix_fmt yuv420p -threads 0 -f v4l2 /dev/video0
