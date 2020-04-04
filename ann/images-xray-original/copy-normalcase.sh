i=0
for f in ../../../chest-xray-pneumonia-NORMAL/*.jpeg;do 
	if [[ $i -lt 120 ]]; then
	  echo cp $f n_$i.jpg;
	  cp $f n_$i.jpg;
	else	 
	  echo cp $f test_n_$(($i-120)).jpg;
	  cp $f test_n_$(($i-120)).jpg;
	fi
	((i=i+1))
	if [[ $i -eq 150 ]]; then
    		break
  	fi
done
