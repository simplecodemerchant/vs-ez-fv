interface String{
    toTitleCase(): string
}

String.prototype.toTitleCase = function(){
    return this.charAt(0).toUpperCase() + this.slice(1)
}