export default function session() {
    return {

	user: function(context) {
	    return context.container.lookup('simple-auth-session:main').content.user;
	}
	
    };
}
