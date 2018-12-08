<?php 

	$current_post_categories = get_the_category( $post->ID );

	/**
	 * @var {int} $custom_related_posts_count - number o related posts to display
	 */
	$custom_related_posts_count = 5;

	/**
	 * @var {arr} $current_deepest_categories - associative array of the deepest categories on this post
	 */
	$current_deepest_categories = array();

	// First index all of the categories
	foreach ( $current_post_categories as $category ) {
		$current_deepest_categories[$category->cat_ID] = $category;
	}

	// Loop through again and remove any categories that are the parent of another category present
	foreach ( $current_post_categories as $category ) {
		if ( isset($current_deepest_categories[$category->category_parent]) ) {
			unset( $current_deepest_categories[$category->category_parent] );
		}
	}

	// If we have 2 or more equally deep categories, too bad - we can only use one.
	$selected_deepest_category = $current_deepest_categories[0]->cat_ID;

	$custom_related_posts = get_posts(
		array(
			'numberposts'	=> $custom_related_posts_count,
			'category' 		=> $selected_deepest_category
		)
	);

?>


<div class="custom-related-posts">
	<h2>Related Posts</h2>
	<?php foreach ($custom_related_posts as $custom_related_post): ?>
		<div class="custom-related-post">
			<a href="<?php echo $custom_related_post->guid ?>">
				<?php echo $custom_related_post->post_title ?>		
			</a>
		</div>
	<?php endforeach ?>
</div>