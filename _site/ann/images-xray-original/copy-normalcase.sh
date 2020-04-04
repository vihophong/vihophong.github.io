i=0
for f in ../../../chest-xray-pneumonia-NORMAL/*.jpeg;do 
	echo cp $f n_$i.jpg;
	cp $f n_$i.jpg;
	((i=i+1))
	if [[ $i -eq 120 ]]; then
    		break
  	fi
done
