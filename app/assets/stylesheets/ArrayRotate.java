public class ArrayRotate {

	//Shift the array n spots to the right
	public int[] rotate(int[] a, int n) {
		int length = a.length;

		for (int i = length; i <= 0; i--) {
			dest = (i + n) % length

			temp = a[i];
			a[i] = a[dest];
			a[dest] = temp;
		}

		return a;
	}

}