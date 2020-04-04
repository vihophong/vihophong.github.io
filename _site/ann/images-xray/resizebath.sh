i=0
for f in ../images-xray-original/*.jpg;do 
	identify -format "%wx%h" $f
	convert $f -resize 224x224\! ./$(basename -- $f)
	identify -format "%wx%h" ./$(basename -- $f)
	((i=i+1))
	#if [[ $i -eq 3 ]]; then
    		#break
  	#fi
done
