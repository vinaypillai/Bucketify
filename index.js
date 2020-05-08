function Bucket(min,size){
    if(size<=0){
        throw RangeError("size must be greater than zero")
    }
    this.min = min;
    this.max = min+size;
    this.vals = [];
}
function Bucketify({list,getProperty,minRange,maxRange,maxBuckets,bucketSize}){
    // If list is not array or
    // getProperty is not null and not a function or
    // minRange is not null and not a number or
    // maxRange is not null and not a number or
    // maxBuckets is not null and not a number, or bucketSize is not null, or maxBuckets is negative
    // bucketSize is not null and not a number, or maxBuckets is not null, or bucketSize is negative
    // then throw an illegal arguments error
    if(
        !Array.isArray(list)
        || (getProperty != null && typeof getProperty !== "function")
        || (minRange != null && typeof minRange !== "number")
        || (maxRange != null && typeof maxRange !== "number")
        || (maxBuckets != null && (bucketSize != null || typeof maxBuckets !== "number" || maxBuckets<=0))
        || (bucketSize != null && (maxBuckets != null || typeof bucketSize !== "number" || bucketSize<=0))
    ){
        throw TypeError("Illegal arguments")
    }
    const minRangeFound = minRange!=null;
    minRange = (minRangeFound) ? minRange : Number.MAX_SAFE_INTEGER;
    const maxRangeFound = maxRange!=null;
    maxRange = (maxRangeFound) ? maxRange : Number.MIN_SAFE_INTEGER;
    // If max range is less than min range, throw range error
    if(minRangeFound && maxRangeFound && maxRange<minRange){
        throw RangeError("maxRange must be greater than or equal to minRange")
    }
    // Default bucketify get returns element
    this.getProperty = (getProperty!=null) ? getProperty : (e)=>e;
    list.forEach((element)=>{
        const index = this.getProperty(element);
        // Update min range if not found
        if(!minRangeFound){
            minRange = Math.min(minRange,index);
        }        
        // Update max range if not found
        if(!maxRangeFound){
            maxRange = Math.max(maxRange,index);
        }
    });
    this.min = minRange;
    this.max = maxRange;
    const range = this.max - this.min;
    const expectedBucketCount = range + 1;
    const actualBucketCount = (maxBuckets!=null) ? Math.min(expectedBucketCount,maxBuckets) :  expectedBucketCount;
    const expectedBucketSize = Math.ceil(expectedBucketCount/actualBucketCount);
    const actualBucketSize = (bucketSize!=null) ? bucketSize : expectedBucketSize;
    this.buckets = [];
    for(let i=this.min;i<=this.max;i+=actualBucketSize){
        this.buckets.push(new Bucket(i,actualBucketSize));
    }
    list.forEach((element)=>{
        this.add(element);
    });
}
Bucketify.prototype.add = function(element){
    const index = this.getProperty(element);;
    // Binary search for bucket to insert element into
    let minBucketIndex = 0;
    let maxBucketIndex = this.buckets.length-1;
    let bucketFound = false;
    while(!bucketFound){
        let bucketIndex = Math.floor((minBucketIndex+maxBucketIndex)/2);
        if(this.buckets[bucketIndex].min<=index && this.buckets[bucketIndex].max>index){
            this.buckets[bucketIndex].vals.push(element);
            bucketFound = true;
        }else if(this.buckets[bucketIndex].min>index){
            if((maxBucketIndex-minBucketIndex)<=2){
                this.buckets[bucketIndex-1].vals.push(element);
                bucketFound = true;
            }else{
                maxBucketIndex = bucketIndex;
            }
        }else{
            if((maxBucketIndex-minBucketIndex)<=2){
                this.buckets[bucketIndex+1].vals.push(element);
                bucketFound = true;
            }else{
                minBucketIndex = bucketIndex;
            }
        }
    }
}

module.exports = Bucketify;