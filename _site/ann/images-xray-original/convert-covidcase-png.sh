i=0
for f in *.png;do 
	convert $f $(basename $f .png).jpg
	((i=i+1))
	#if [[ $i -eq 3 ]]; then
    		#break
  	#fi
done
